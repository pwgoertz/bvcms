﻿//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated by a tool.
//     Runtime Version:4.0.30319.18010
//
//     Changes to this file may cause incorrect behavior and will be lost if
//     the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace CmsWeb {
    using System;
    
    
    /// <summary>
    ///   A strongly-typed resource class, for looking up localized strings, etc.
    /// </summary>
    // This class was auto-generated by the StronglyTypedResourceBuilder
    // class via a tool like ResGen or Visual Studio.
    // To add or remove a member, edit your .ResX file then rerun ResGen
    // with the /str option, or rebuild your VS project.
    [global::System.CodeDom.Compiler.GeneratedCodeAttribute("System.Resources.Tools.StronglyTypedResourceBuilder", "4.0.0.0")]
    [global::System.Diagnostics.DebuggerNonUserCodeAttribute()]
    [global::System.Runtime.CompilerServices.CompilerGeneratedAttribute()]
    internal class Resource1 {
        
        private static global::System.Resources.ResourceManager resourceMan;
        
        private static global::System.Globalization.CultureInfo resourceCulture;
        
        [global::System.Diagnostics.CodeAnalysis.SuppressMessageAttribute("Microsoft.Performance", "CA1811:AvoidUncalledPrivateCode")]
        internal Resource1() {
        }
        
        /// <summary>
        ///   Returns the cached ResourceManager instance used by this class.
        /// </summary>
        [global::System.ComponentModel.EditorBrowsableAttribute(global::System.ComponentModel.EditorBrowsableState.Advanced)]
        internal static global::System.Resources.ResourceManager ResourceManager {
            get {
                if (object.ReferenceEquals(resourceMan, null)) {
                    global::System.Resources.ResourceManager temp = new global::System.Resources.ResourceManager("CmsWeb.Resource1", typeof(Resource1).Assembly);
                    resourceMan = temp;
                }
                return resourceMan;
            }
        }
        
        /// <summary>
        ///   Overrides the current thread's CurrentUICulture property for all
        ///   resource lookups using this strongly typed resource class.
        /// </summary>
        [global::System.ComponentModel.EditorBrowsableAttribute(global::System.ComponentModel.EditorBrowsableState.Advanced)]
        internal static global::System.Globalization.CultureInfo Culture {
            get {
                return resourceCulture;
            }
            set {
                resourceCulture = value;
            }
        }
        
        /// <summary>
        ///   Looks up a localized string similar to &lt;?xml version=&quot;1.0&quot; encoding=&quot;utf-16&quot;?&gt;
        ///&lt;TestPlan&gt;
        ///  &lt;Sections&gt;
        ///    &lt;Section name=&quot;Meta&quot;&gt;
        ///      &lt;Tests&gt;
        ///        &lt;test name=&quot;Lookup&quot;&gt;
        ///          &lt;args&gt;
        ///            &lt;name&gt;table&lt;/name&gt;
        ///          &lt;/args&gt;
        ///          &lt;script&gt;
        ///            &lt;![CDATA[
        ///xml = webclient.DownloadString(&apos;APIMeta/lookups/&apos; + table)
        ///return xml
        ///]]&gt;
        ///          &lt;/script&gt;
        ///          &lt;description&gt;
        ///            &lt;![CDATA[
        ///&lt;ul&gt;
        ///&lt;li&gt;These are tables of id / value pairs for look up tables&lt;/li&gt;
        ///&lt;li&gt;Try MemberStatus as a name of a table&lt;/ [rest of string was truncated]&quot;;.
        /// </summary>
        internal static string APITestPlan {
            get {
                return ResourceManager.GetString("APITestPlan", resourceCulture);
            }
        }
        
        /// <summary>
        ///   Looks up a localized string similar to &lt;p&gt;Hi {first},&lt;/p&gt;
        ///&lt;p&gt;I need a substitute for {org}&lt;br&gt;
        ///on {meetingdate} at {meetingtime}&lt;/p&gt;
        ///&lt;blockquote&gt;
        ///&lt;p&gt;{yeslink}&lt;/p&gt;
        ///&lt;p&gt;{nolink}&lt;/p&gt;
        ///&lt;/blockquote&gt;
        ///&lt;p&gt;
        ///Thank you for your consideration,&lt;br /&gt;
        ///{sendername}
        ///&lt;/p&gt;.
        /// </summary>
        internal static string VolSubModel_ComposeMessage_Body {
            get {
                return ResourceManager.GetString("VolSubModel_ComposeMessage_Body", resourceCulture);
            }
        }
        
        /// <summary>
        ///   Looks up a localized string similar to 
        ///&lt;p&gt;Hi {first},&lt;/p&gt;
        ///&lt;p&gt;We need additional volunteers for {org}&lt;br&gt;
        ///on {meetingdate} at {meetingtime}&lt;/p&gt;
        ///&lt;blockquote&gt;
        ///&lt;p&gt;{yeslink}&lt;/p&gt;
        ///&lt;p&gt;{nolink}&lt;/p&gt;
        ///&lt;/blockquote&gt;
        ///&lt;p&gt;
        ///Thank you for your consideration,&lt;br /&gt;
        ///{sendername}
        ///&lt;/p&gt;.
        /// </summary>
        internal static string VolunteerRequestModel_ComposeMessage_Body {
            get {
                return ResourceManager.GetString("VolunteerRequestModel_ComposeMessage_Body", resourceCulture);
            }
        }
    }
}
